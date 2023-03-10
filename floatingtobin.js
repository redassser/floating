function FloatToBin32() {
    const inp = document.getElementById("inp").value //Get the number

    //Getting the binary from a float in JS is not very simple 

    //arraybuffer creates an array of bytes of size 4; 4 bytes = 32 bits; not directly writable/readable
    var Binary = new ArrayBuffer(4); // -> [00000000, 00000000, 00000000, 00000000]

    //Dataview lets us write to the array buffer 
    //setfloat32 method for dataview stores our signed float in the buffer
    new DataView(Binary).setFloat32(0, inp); //For example if inp=64 -> [01000010, 10000000, 00000000, 00000000]

    //uint8array makes an arraybufferview of the buffer so we can access the directly read/writable array of bytes (as base 10 ints);
    const bytes = new Uint8Array(Binary); // inp=64 -> [01000010, 10000000, 00000000, 00000000] -> [66, 128, 0, 0]

    //Now we transfer to a readable binary array
    binbytes = [];
    bytes.forEach(byte => {
        byte = byte.toString(2); //converts base 10 into base 2
        if(byte.length<8) {byte = ("0".repeat(8-byte.length)).concat(byte)} //makes sure each binary number is 8 digits
        binbytes.push(byte);
    });
    //Decode the binary from the mantissa into a fraction
    var twomansum = 0;
    for(let i=9;i<32;i++) {
        twomansum += binbytes.join("")[i]*Math.pow(2, 8-i);
    }
    var value = {
        binary: binbytes.join(""),
        sign: binbytes[0][0],
        exponent: binbytes.join("").slice(1,9),
        mantissa: binbytes.join("").slice(9),
        twoexp: (parseInt(binbytes.join("").slice(1,9), 2)-127),
        twoman: 1+twomansum
    }

    //plenty of values to change
    document.getElementById("sign").innerHTML = value.sign;
    document.getElementById("exp").innerHTML = value.exponent;
    document.getElementById("man").innerHTML = value.mantissa;
    document.getElementById("bin").innerHTML = value.binary;
    document.getElementById("signv").innerHTML = (value.sign==0) ? '+' : '-';
    document.getElementById("expv").innerHTML = (inp!=0) ? `2<sup>${value.twoexp}</sup>` : "2<sup>0</sup>";
    document.getElementById("manv").innerHTML = (inp!=0) ? value.twoman : "0";
    document.getElementById("real").innerHTML = (inp!=0) ? value.twoman*Math.pow(2, value.twoexp): "0";
    document.getElementById("hex").innerHTML = (inp!=0) ? "0x"+parseInt(value.binary,2).toString(16) : "0x00000000";
    return value;
}
//Practically the same except with a few minor changes
function FloatToBin64() {
    const inp = document.getElementById("dinp").value
    var Binary = new ArrayBuffer(8);
    new DataView(Binary).setFloat64(0, inp);
    const bytes = new Uint8Array(Binary);
    binbytes = [];

    bytes.forEach(byte => {
        byte = (byte >>> 0).toString(2);
        if(byte.length<8) {byte = ("0".repeat(8-byte.length)).concat(byte)}
        binbytes.push(byte);
    });
    var twomansum = 0;
    for(let i=12;i<64;i++) {
        twomansum += binbytes.join("")[i]*Math.pow(2, 11-i);
    }
    var value = {
        binary: binbytes.join(""),
        sign: binbytes[0][0],
        exponent: binbytes.join("").slice(1,12),
        mantissa: binbytes.join("").slice(12),
        twoexp: (parseInt(binbytes.join("").slice(1,12), 2)-1023),
        twoman: 1+twomansum
    }
    document.getElementById("dsign").innerHTML = value.sign;
    document.getElementById("dexp").innerHTML = value.exponent;
    document.getElementById("dman").innerHTML = value.mantissa;
    document.getElementById("dbin").innerHTML = value.binary;
    document.getElementById("dsignv").innerHTML = (value.sign==0) ? '+' : '-';
    document.getElementById("dexpv").innerHTML = (inp!=0) ? `2<sup>${value.twoexp}</sup>` : "2<sup>0</sup>";
    document.getElementById("dmanv").innerHTML = (inp!=0) ? value.twoman : "0";
    document.getElementById("dreal").innerHTML = (inp!=0) ? value.twoman*Math.pow(2, value.twoexp): "0";
    document.getElementById("dhex").innerHTML = (inp!=0) ? "0x"+BigInt("0b"+value.binary).toString(16) : "0x0000000000000000";
    return value;
}
var whichtype = 1, both = 0;
function switchtype(x) {
    if(x==1) {
        if(whichtype==1) {
            document.getElementById("switch").value = "Switch to Float"
            document.getElementById("double").style.display = "block"
            document.getElementById("doubletitle").style.display = "block";
            document.getElementById("float").style.display = "none";
            document.getElementById("floattitle").style.display = "none";
            whichtype = 0;
        } else {
            document.getElementById("switch").value = "Switch to Double"
            document.getElementById("double").style.display = "none";
            document.getElementById("doubletitle").style.display = "none";
            document.getElementById("float").style.display = "block";
            document.getElementById("floattitle").style.display = "block";
            whichtype = 1;
        }
    } else {
        document.getElementById("double").style.display = "block"
        document.getElementById("doubletitle").style.display = "block";
        document.getElementById("float").style.display = "block";
        document.getElementById("floattitle").style.display = "block";
    }
}