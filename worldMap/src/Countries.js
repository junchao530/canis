import {useState} from 'react';


export const missingCountries = [
  { name: "Singapore", latLng: [1.3521, 103.8198] },
  { name: "BouvetIsland", latLng: [54.4208, 3.3464] },
  { name: "Bermuda", latLng: [32.3078, 64.7505] },
  { name: "Andorra", latLng: [42.5063, 1.5218] },
  { name: "AmericanSamoa", latLng: [14.271, 170.1322] },
  { name: "ÅlandIslands", latLng: [60.1785, 19.9156] },
];


export const useCountries = () => {
  const [countries, setCountries] = useState({
    CN: 103,
AF: 7,
CH: 19,
AT: 12,
ID: 5,
FR: 25,
CY: 9,
LS: 8,
IR: 13,
RS: 2,
SA: 12,
BI: 21,
CM: 21,
CD: 1,
TD: 21,
IT: 11,
US: 255,
BG: 10,
TT: 2,
JP: 20,
EG: 34,
PL: 11,
SR: 2,
KR: 7,
PK: 12,
GB: 243,
QA: 10,
RU: 4,
KE: 9,
FI: 9,
TZ: 9,
ES: 12,
SO: 8,
IN: 12,
MV: 3,
ZW: 11,
NG: 9,
CO: 3,
NL: 13,
UA: 2,
FJ: 4,
BE: 25,
ZA: 11,
WS: 1,
NZ: 237,
DE: 16,
CA: 254,
KZ: 2,
AU: 239,
GR: 11,
SS: 7,
ET: 7,
CL: 2,
DO: 2,
DZ: 22,
AO: 7,
AG: 1,
AR: 2,
MW: 9,
AL: 5,
BH: 10,
CG: 7,
HR: 9,
ER: 7,
GD: 3,
GH: 7,
MR: 21,
RW: 21,
IE: 9,
KW: 10,
MT: 10,
PH: 2,
NA: 7,
PE: 2,
PT: 10,
LK: 5,
SK: 9,
SI: 9,
DK: 9,
LB: 25,
IQ: 10,
ML: 21,
GN: 21,
SN: 21,
DJ: 21,
MA: 30,
GM: 7,
PG: 1,
UG: 9,
TH: 6,
JO: 10,
HU: 9,
ME: 1,
YE: 13,
EE: 9,
LR: 7,
SD: 7,
BR: 8,
MN: 2,
BW: 8,
EC: 2,
SV: 3,
UY: 2,
TO: 1,
CU: 4,
GQ: 21,
MX: 4,
PA: 8,
VE: 3,
IS: 2,
ST: 1,
LT: 10,
MU: 21,
CR: 2,
MM: 6,
NP: 3,
IL: 12,
EAC: 1,
TIB: 1,
BO: 2,
NO: 2,
BB: 2,
BY: 1,
LA: 17,
KG: 1,
LV: 9,
AH: 1,
HLJ: 1,
GS: 1,
TW: 1,
SX: 1,
VN: 23,
MY: 5,
RO: 23,
BD: 1,
KH: 16,
GY: 1,
MK: 1,
SL: 7,
SG: 3,
BJ: 20,
BF: 20,
CF: 20,
KM: 20,
SZ: 6,
GA: 20,
GW: 20,
CI: 20,
LY: 15,
MG: 20,
MZ: 6,
NE: 20,
STP: 6,
SC: 20,
TG: 20,
TN: 29,
ZM: 9,
OM: 9,
PS: 9,
SY: 9,
TR: 12,
AE: 11,
BN: 1,
CZ: 9,
LU: 22,
SE: 8,
CV: 20,
DRC: 14,
DM: 14,
HT: 14,
MC: 14,
RC: 14,
LC: 14,
VU: 14,
GT: 1,
HN: 1,
PY: 1,
NI: 1,
PR: 1,
  });
  return {countries,setCountries};
}

export const colorScale = ["#E2AEFF", "#5E32CA"];
