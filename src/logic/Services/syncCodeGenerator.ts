const CONSONANTS =  "BCDFGHJKLMNPQRSTVWXZ";
const BAD_WORDS = ['NGGR', 'NGRR', 'NNGR', 'CVNT', 'FVCK', 'SHJT', 'TWNK']; 

export const syncCodeGenerator = (): string => {
  let code = "";
  for(let i = 0; i < 4; i++){
    code += CONSONANTS.charAt(Math.floor(Math.random() * CONSONANTS.length));
  }
  if(BAD_WORDS.includes(code)){
    return syncCodeGenerator();
  }
  return code; 
}
