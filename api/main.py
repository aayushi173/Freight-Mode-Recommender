from fastapi import FastAPI
import numpy as np
import joblib

# from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

# Read-in Model  & Robust Standardizer
model_name = 'XGB'
model = joblib.load(f'./api/{model_name}_model_num_components_10.pk1')
standardizer_pre = joblib.load('./api/standardizer_pre_PCA.pk1')

Modes = {1: 'Vessel', 3: 'Air', 4: 'USPS', 5: 'Truck', 6: 'Rail', 7: 'Pipeline', 8: 'Other', 9: 'FTZs'}
mex_can_states = {"XA": 1, "XC": 2, "XM": 3, "XB": 4, "XW": 5, "XT": 6, "XN": 7, "XO": 8, "XP": 9, "XQ": 10, "XS": 11,
                  "XV": 12, "XY": 13, "OT": 14, "AG": 15, "BC": 16,"BN": 17, "BS": 18, "CH": 19,"CL": 20,"CM": 21,
                  "CO": 22,"CS": 23, "DF": 24,"DG": 25, "GR": 26, "GT": 27, "HG": 28, "JA": 29, "MI": 30, "MO": 31,
                  "MX": 32, "NA": 33,"NL": 34, "OA": 35, "PU": 36, "QR": 37, "QT": 38, "SI": 39, "SL": 40, "SO": 41,
                  "TB": 42, "TL": 43, "TM": 44, "VE": 45, "YU": 46, "ZA": 47, "XX":48}
US_states = {"AL": 1, "AK": 2, "AS": 3, "AZ": 4, "AR": 5, "CA": 6, "CO": 7, "CT": 8, "DE": 9, "DC": 10, "FL": 11,
             "GA": 12, "HI": 13, "ID": 14, "IL": 15,"IN": 16, "IA": 17, "KS": 18, "KY": 19, "LA": 20, "ME": 21,
             "MD": 22, "MA": 23,"MI": 24, "MN": 25,"MS": 26, "MO": 27, "MT": 28, "NE": 29, "NV": 30, "NH": 31,
             "NJ": 32,"NM": 33, "NY": 34, "NC": 35, "ND":36, "OH": 37, "OK": 38, "OR": 39, "PA": 40, "RI": 41,
             "SC": 42, "SD": 43, "TN": 44, "TX": 45, "UT": 46, "VT": 47, "VA": 48, "WA": 49, "WV": 50, "WI": 51,
             "WY": 52, "DU": 53,}
cont_codes = {'X': 1, "1": 1, '0': 0}
optimal_indices = [6, 7, 5, 3, 1, 2, 10, 11, 8, 9, 4, 0]

XGB_unmap = {0: 1, 1: 3, 2: 4, 3: 5, 4: 6, 5: 7, 6: 8}

# RAW HEADER:
#['TRDTYPE' 'USASTATE' 'COMMODITY2' 'DISAGMOT' 'MEXSTATE_CANPROV' 'COUNTRY', 'VALUE' 'SHIPWT' 'FREIGHT_CHARGES' 'DF' 'CONTCODE' 'MONTH' 'YEAR']
# Example inputs (your dropdown selection):
#Example = [1, 'CA', 7, 5, 'AG', 2010, 72422, 0, 0, 1.0, '0', 3, 2024]
#Example = [1, 'CA', 6, 5, 'XO', 1220, 5298814, 0, 57912, 1.0, '0', 3, 2024]
# Example = [1, 'AZ', 74, 3, 'XO', 1220, 184878, 3410, 4055, 1.0, 'X', 3, 2024]


# The following 10 features will be replaced with your drop down selection.
# I just arbitrarily picked the above 3 examples for testing from a section of the dataset unseen by the model and all 3 were predicted accurately.

Example = [1.0,'MS',85.0,5,'JA',2010.0,486487.0,0.0,0.0,2.0,'0',2.0,2019.0]

USASTATE = Example[1] #MS
COMMODITY2 = Example[2] #85
MEXSTATE_CANPROV = Example[4] #JA
VALUE = Example[6] #486487
SHIPWT = Example[7] #0
FREIGHT_CHARGES = Example[8] #0
DF = Example[9] #2
CONTCODE = Example[10] #'0'
MONTH = Example[11] 
YEAR = Example[12]

def getMode(SHIPWT,
    FREIGHT_CHARGES,
    VALUE,
    MEXSTATE_CANPROV,
    USASTATE,
    COMMODITY2,
    MONTH,
    YEAR,
    DF,
    CONTCODE):

    features = np.asarray([[1, US_states[USASTATE], COMMODITY2,  mex_can_states[MEXSTATE_CANPROV], 0, VALUE, SHIPWT, FREIGHT_CHARGES, DF, cont_codes[CONTCODE], MONTH,  YEAR]])
    features = standardizer_pre.transform(features)
    # Have to be re-arranged in PCA order of importance (optimal indices)
    features = features[:, optimal_indices][:, :10] # Top ten important features. the last two add nothing to accuracy
    print(features)
    predicted_Mode_Number = model.predict(features)
    if model_name == 'XGB': predicted_Mode_Number = [XGB_unmap[predicted_Mode_Number[0]]]
    Predicted_Mode = Modes[predicted_Mode_Number[0]]
    print(Predicted_Mode)

    return Predicted_Mode


# mode = getMode(SHIPWT,
#     FREIGHT_CHARGES,
#     VALUE,
#     MEXSTATE_CANPROV,
#     USASTATE,
#     COMMODITY2,
#     MONTH,
#     YEAR,
#     DF,
#     CONTCODE)

# print (mode)
# fast api init
app = FastAPI()
origins = ['*']
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# make an echo function for testing
@app.get("/echo")
def echo(start_lat: float, start_lng: float, end_lat: float, end_lng: float, height: int = 300, width: int = 300):
    # return the parameters
    return JSONResponse({'start_lat': start_lat, 'start_lng': start_lng, 'end_lat': end_lat, 'end_lng': end_lng, 'height': height, 'width': width})
#-----------------

# app = FastAPI()
# origins = ['*']
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# make an echo function for testing
# @app.get("/echo")
# def echo(start_lat: float, start_lng: float, end_lat: float, end_lng: float, height: int = 300, width: int = 300):
#     # return the parameters
#     return JSONResponse({'start_lat': start_lat, 'start_lng': start_lng, 'end_lat': end_lat, 'end_lng': end_lng, 'height': height, 'width': width})
# #-----------------

@app.get("/")
async def root():
    return {"message": "Hello World"}

# GET /items/?name=apple&price=1.99
@app.get("/getMode/")
def read_item(MEXSTATE_CANPROV: str,USASTATE: str, SHIPWT: float, FREIGHT_CHARGES: float, VALUE: float,COMMODITY2: float, MONTH: int, YEAR: int, DF: float, CONTCODE: str):
    mode = getMode(SHIPWT,
    FREIGHT_CHARGES,
    VALUE,
    MEXSTATE_CANPROV,
    USASTATE,
    COMMODITY2,
    MONTH,
    YEAR,
    DF,
    CONTCODE)
    return {'mode': mode}
