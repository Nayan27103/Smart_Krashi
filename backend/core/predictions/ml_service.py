import random
from diseases.models import Disease

def predict_disease(image):
    """
    Dummy AI logic.
    Later replace with TensorFlow model.
    """

    diseases = Disease.objects.all()

    if not diseases.exists():
        return None, 0.0

    disease = random.choice(diseases)
    confidence = round(random.uniform(70, 99), 2)

    return disease, confidence