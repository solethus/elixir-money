var n=r=>Intl.NumberFormat("en",{style:"currency",currency:r}).formatToParts().find(t=>t.type==="currency").value;export{n as a};
