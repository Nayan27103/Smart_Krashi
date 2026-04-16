import random

def predict_price(current_price, crop_name="Wheat"):
    """
    Simulates price forecasting based on common seasonal agricultural trends.
    """
    # Simple logic: Most crops see a 5-15% increase toward the end of the season.
    trends = {
        "Wheat": 0.12,
        "Rice": 0.08,
        "Cotton": 0.15,
        "Corn": 0.10,
        "Soybean": 0.11
    }
    
    growth = trends.get(crop_name, 0.05)
    # Add some randomness for 'accuracy'
    random_factor = random.uniform(-0.02, 0.02)
    
    predicted_price = current_price * (1 + growth + random_factor)
    return round(predicted_price, 2)