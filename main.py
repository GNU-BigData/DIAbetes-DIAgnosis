from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
import joblib
import uvicorn
from starlette.middleware.cors import CORSMiddleware

# 모델 불러오기
model = joblib.load("diabetes_model.pkl")

app = FastAPI()


# 요청 데이터 형식 정의
class DiabetesData(BaseModel):
    n_pregnant: int
    glucose_concentration: int
    blood_pressure: int
    skin_thickness: int
    serum_insulin: int
    BMI: float
    pedigree_function: float
    age: int


# 예측을 위한 경로
@app.post("/predict")
def predict_diabetes(data: DiabetesData):
    try:
        # 데이터를 모델 입력 형식으로 변환
        input_data = [
            [
                data.n_pregnant,
                data.glucose_concentration,
                data.blood_pressure,
                data.skin_thickness,
                data.serum_insulin,
                data.BMI,
                data.pedigree_function,
                data.age,
            ]
        ]
        print("Input data:", input_data)  # Debugging statement

        # 예측 수행
        X_new = np.array(input_data)
        print("X_new shape:", X_new.shape)  # Debugging statement

        prediction = model.predict(X_new)
        print("Prediction:", prediction)  # Debugging statement

        return {"prediction": int(prediction[0])}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Rest of your code...


origins = ["*"]  # 허용할 url 주소, *이면 모든 url에 대해 허용

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
