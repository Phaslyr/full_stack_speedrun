from flask import Flask, jsonify, request
import random

app = Flask(__name__)

quotes = [
    {"id": 1, "text": "The only way to do great work is to love what you do.", "author": "Steve Jobs"},
    {"id": 2, "text": "Code is like humor. When you have to explain it, it's bad.", "author": "Cory House"},
    {"id": 3, "text": "First, solve the problem. Then, write the code.", "author": "John Johnson"},
    {"id": 4, "text": "Simplicity is the soul of efficiency.", "author": "Austin Freeman"},
    {"id": 5, "text": "Fix the cause, not the symptom.", "author": "Steve Maguire"},
]

next_id = 6  # For generating new IDs

@app.get("/api/quote")
def get_quote():
    quoteNum = random.randint(0, len(quotes) - 1)
    return quotes[quoteNum], 200

@app.get("/api/quotes")
def get_quotes():
    return quotes, 200

@app.post("/api/quotes")
def post_quotes():
    global next_id
    quote_entry = request.get_json()
    quote = {"id": next_id, "text": quote_entry.get("text"), "author": quote_entry.get("author"),}
    quotes.append(quote)
    next_id += 1
    return quote, 201

@app.put("/api/quotes/<int:id>")
def put_quotes(id):
    quote_entry = request.get_json()
    for q in quotes:
        if q.get("id") == id:
            q["text"] = quote_entry.get("text")
            q["author"] = quote_entry.get("author")
            return q, 200
    return {"error": "Quote not found"}, 404
    
@app.delete("/api/quotes/<int:id>")
def delete_quotes(id):
    for i in range(len(quotes)):
        if quotes[i].get("id") == id:
            deleted = quotes.pop(i)
            return {"quote": deleted, "message": "Success!"}, 200
    return {"error": "Quote not found"}, 404

if __name__ == "__main__":
    app.run(debug=True, port=5000)