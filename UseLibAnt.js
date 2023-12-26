let { log } = console;


let models = [];
const maxRec = 15;
const proxy = " https://api.allorigins.win/raw?url="; // A free and open source javascript AnyOrigin alternative, 
const biomodelsInfoURL = "/makesbml/buildBiomodelsSearch/biomodelsinfo.json";

var antCode;
var sbmlCode;
var sbmlResult = "None";
var antResult = "None";

var loadAntimonyString; // libantimony function
var loadString;   // 		"
var loadSBMLString; //		"
var getSBMLString; //		"
var getAntimonyString; //	"
var getCompSBMLString; //	"
var clearPreviousLoads; //	"
var getLastError; //		"
var getWarnings;  //		"
var getSBMLInfoMessages; //	"
var getSBMLWarnings; //		"
var freeAll;      //		"
var jsFree;         // emscripten function
var jsAllocateUTF8; //  		"

window.onload = function() {
  initLoad();
};

// Load library functions (asynchronous call):
function initLoad() {
  try {
    libantimony().then((libantimony) => {
      //	Format: libantimony.cwrap( function name, return type, input param array of types).
      loadString = libantimony.cwrap("loadString", "number", ["number"]);
      loadAntimonyString = libantimony.cwrap("loadAntimonyString", "number", [
        "number",
      ]);
      loadSBMLString = libantimony.cwrap("loadSBMLString", "number", [
        "number",
      ]);
      getSBMLString = libantimony.cwrap("getSBMLString", "string", ["null"]);
      getAntimonyString = libantimony.cwrap("getAntimonyString", "string", [
        "null",
      ]);
      getCompSBMLString = libantimony.cwrap("getCompSBMLString", "string", [
        "string",
      ]);
      clearPreviousLoads = libantimony.cwrap("clearPreviousLoads", "null", [
        "null",
      ]);
      getLastError = libantimony.cwrap("getLastError", "string", ["null"]);
      getWarnings = libantimony.cwrap("getWarnings", "string", ["null"]);
      getSBMLInfoMessages = libantimony.cwrap("getSBMLInfoMessages", "string", [
        "string",
      ]);
      getSBMLWarnings = libantimony.cwrap("getSBMLWarnings", "string", [
        "string",
      ]);
      freeAll = libantimony.cwrap("freeAll", "null", ["null"]);

      jsFree = (strPtr) => libantimony._free(strPtr);
      jsAllocateUTF8 = (newStr) => libantimony.allocateUTF8(newStr);
    });
  } catch (err) {
    console.log("Load libantimony error: ", err);
  }
}

async function processAntimony() {
  antCode = `
  // Created by libAntimony v2.12.0.3
  model *BIOMD0000000001()
  
    // Compartments and Species:
    compartment comp1;
    species BLL in comp1, IL in comp1, AL in comp1, A in comp1, BL in comp1;
    species B in comp1, DLL in comp1, D in comp1, ILL in comp1, DL in comp1;
    species I in comp1, ALL in comp1, BwLL;
  
    // Reactions:
    React0: B -> BL; comp1*(kf_0*B - kr_0*BL);
    React1: BL -> BLL; comp1*(kf_1*BL - kr_1*BLL);
    React2: BwLL -> ALL; comp1*(kf_2*BLL - kr_2*ALL);
    React3: A -> AL; comp1*(kf_3*A - kr_3*AL);
    React4: AL -> ALL; comp1*(kf_4*AL - kr_4*ALL);
    React5: B -> A; comp1*(kf_5*B - kr_5*A);
    React6: BL -> AL; comp1*(kf_6*BL - kr_6*AL);
    React7: I -> IL; comp1*(kf_7*I - kr_7*IL);
    React8: IL -> ILL; comp1*(kf_8*IL - kr_8*ILL);
    React9: A -> I; comp1*(kf_9*A - kr_9*I);
    React10: AL -> IL; comp1*(kf_10*AL - kr_10*IL);
    React11: ALL -> ILL; comp1*(kf_11*ALL - kr_11*ILL);
    React12: D -> DL; comp1*(kf_12*D - kr_12*DL);
    React13: DL -> DLL; comp1*(kf_13*DL - kr_13*DLL);
    React14: I -> D; comp1*(kf_14*I - kr_14*D);
    React15: IL -> DL; comp1*(kf_15*IL - kr_15*DL);
    React16: ILL -> DLL; comp1*(kf_16*ILL - kr_16*DLL);
  
    // Events:
    RemovalACh: at time > t2: kf_13 = 0, kf_8 = 0, kf_4 = 0, kf_1 = 0, kf_12 = 0, kf_7 = 0, kf_3 = 0, kf_0 = 0;
  
    // Species initializations:
    BLL = 0;
    IL = 0;
    AL = 0;
    A = 0;
    BL = 0;
    B = 1.66057788110262e-21/comp1;
    DLL = 0;
    D = 0;
    ILL = 0;
    DL = 0;
    I = 0;
    ALL = 0;
    BwLL = 3;
  
    // Compartment initializations:
    comp1 = 1e-16;
  
    // Variable initializations:
    t2 = 20;
    kf_0 = 30002;
    kf_3 = 3000;
    kf_7 = 3000;
    kf_12 = 3000;
    kf_1 = 1500;
    kf_4 = 1500;
    kf_8 = 1500;
    kf_13 = 1500;
    kr_0 = 8000;
    kr_1 = 16000;
    kf_2 = 30000;
    kr_2 = 700;
    kr_3 = 8.64;
    kr_4 = 17.28;
    kf_5 = 0.54;
    kr_5 = 10800;
    kf_6 = 130;
    kr_6 = 2740;
    kr_7 = 4;
    kr_8 = 8;
    kf_9 = 19.7;
    kr_9 = 3.74;
    kf_10 = 19.85;
    kr_10 = 1.74;
    kf_11 = 20;
    kr_11 = 0.81;
    kr_12 = 4;
    kr_13 = 8;
    kf_14 = 0.05;
    kr_14 = 0.0012;
    kf_15 = 0.05;
    kr_15 = 0.0012;
    kf_16 = 0.05;
    kr_16 = 0.0012;
  
    // Other declarations: 
    var kf_0, kf_3, kf_7, kf_12, kf_1, kf_4, kf_8, kf_13;
    const comp1, t2, kr_0, kr_1, kf_2, kr_2, kr_3, kr_4, kf_5, kr_5, kf_6, kr_6;
    const kr_7, kr_8, kf_9, kr_9, kf_10, kr_10, kf_11, kr_11, kr_12, kr_13;
    const kf_14, kr_14, kf_15, kr_15, kf_16, kr_16;
  
    // Display Names:
    comp1 is "compartment1";
    BLL is "BasalACh2";
    IL is "IntermediateACh";
    AL is "ActiveACh";
    A is "Active";
    BL is "BasalACh";
    B is "Basal";
    DLL is "DesensitisedACh2";
    D is "Desensitised";
    ILL is "IntermediateACh2";
    DL is "DesensitisedACh";
    I is "Intermediate";
    ALL is "ActiveACh2";
    RemovalACh is "removal of ACh";
  
  
    BLL identity "http://identifiers.org/chebi/CHEBI:27732"
  end  
  `;
  // clearPreviousLoads();
  //console.log("*** Antimony code: ",antCode);
  var ptrAntCode = jsAllocateUTF8(antCode);
  var load_int = loadAntimonyString(ptrAntCode);
  if (load_int > 0) {
    sbmlResult = getSBMLString();
    console.log(sbmlResult);
  } else {
    var errStr = getLastError();
    window.alert(errStr);
  }
  jsFree(ptrAntCode);
}

await processAntimony();