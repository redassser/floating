function FloatToBin32() {
    const inp = document.getElementById("inp").value
    var Binary = new ArrayBuffer(4);
    new DataView(Binary).setFloat32(0, inp);
    const bytes = new Uint8Array(Binary);
    binbytes = [];

    bytes.forEach(byte => {
        byte = (byte >>> 0).toString(2);
        if(byte.length<8) {byte = ("0".repeat(8-byte.length)).concat(byte)}
        binbytes.push(byte);
    });
    var value = {
        binary: binbytes.join(""),
        sign: binbytes[0][0],
        exponent: binbytes.join("").slice(1,9),
        mantissa: binbytes.join("").slice(9),
    }
    
    document.getElementById("sign").innerHTML = value.sign;
    document.getElementById("exp").innerHTML = value.exponent;
    document.getElementById("man").innerHTML = value.mantissa;
    document.getElementById("bin").innerHTML = value.binary;
    return value;
}