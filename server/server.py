from flask import Flask, jsonify


app = Flask(__name__)

    
@app.route("/ping", methods = ['GET'])
def ping():
    return jsonify({
        'message': "home page"
    })

@app.route("/orders", methods = ['GET'])
def orders():
    return jsonify({
        'orders': [{
            "order_id": 98783,
            "adress": "Горбушка",
            "additional_contacts": "ПОЗВОНИТЬ ЗА ЧАС",
            "paid": True,
            "extra": None,
            "customer": "Alex",
            "phone_number": "878374873",
            "metro": "(7)China-town",
            "tovar_arrival_time": "17-22",
            "positions": [{
                "id": 1,
                "name": "ljjeljfle",
                "amount": 2,
                "price": 22000
            },
            {
                "id": 2,
                "name": "ksjdj",
                "amount": 1,
                "price": 1000
            },
            {
                "id": 3,
                "name": "ejfelj",
                "amount": 1,
                "price": 1000
            },
            {
                "id": 4,
                "name": "ppi",
                "amount": 1,
                "price": 1000
            },
            {
                "id": 5,
                "name": "oiglhv",
                "amount": 1,
                "price": 1000
            },
            {
                "id": 6,
                "name": "Доставка",
                "amount": 1,
                "price": 1000
            }
            ]
        },
        {
            "order_id": 123,
            "adress": "Ленинский проспект",
            "additional_contacts": "ПОЗВОНИТЬ ЗА ЧАС",
            "paid": False,
            "extra": 9900,
            "customer": "Mike",
            "phone_number": "878374873",
            "metro": "(3)Leninskiy prospekt",
            "tovar_arrival_time": "13-17",
            "positions": [{
                "id": 1,
                "name": "ljjeljfle",
                "amount": 2,
                "price": 22000
            },
            {
                "id": 2,
                "name": "Доставка",
                "amount": 1,
                "price": 1000
            }]
        }],
        'total_price': 50000,
        'delivery_price': 10000,
        'to_cashier': 40000
    })



if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)