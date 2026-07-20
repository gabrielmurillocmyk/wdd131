// Footer year and last modified
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Static weather values
const tempC = 10;
const windKmh = 5;

function calculateWindChill(temp, wind) {
  return (
    13.12 +
    0.6215 * temp -
    11.37 * Math.pow(wind, 0.16) +
    0.3965 * temp * Math.pow(wind, 0.16)
  ).toFixed(1);
}

let windChillValue = "N/A";
if (tempC <= 10 && windKmh > 4.8) {
  windChillValue = calculateWindChill(tempC, windKmh) + "°C";
}

document.getElementById("windChill").textContent = windChillValue;
