from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Quote
import random
import json

# ============ TEMPLATE VIEWS (return HTML) ============

def home(request):
    all_quotes = Quote.objects.all()
    quote = all_quotes[random.randint(0, len(all_quotes) - 1)]

    context = { "quote": quote }

    return render(request, 'quotes/home.html', context)

def all_quotes(request):
    all_quotes = Quote.objects.all()

    context = { "all_quotes": all_quotes }

    return render(request, 'quotes/all_quotes.html', context)


# ============ API VIEWS (return JSON) ============

def random_quote_api(request):
    all_quotes = Quote.objects.all()
    quote = all_quotes[random.randint(0, len(all_quotes) - 1)]

    context = { "id": quote.get("id"), "text": quote.get("text"), "author": quote.get("author") }

    return JsonResponse(context)

@csrf_exempt  # Allows POST/PUT/DELETE without CSRF token
def quotes_api(request):
    if request.method == "GET":
        all_quotes = Quote.objects.all()

        return JsonResponse(all_quotes, safe=false)
    elif request.method == "POST":
        data = json.loads(request.body.decode('utf-8'))

        q = Quote(text=data.text, author=data.author)
        q.save()

        return JsonResponse(data, status=201)
    else:
        return JsonResponse({ "message": "Method not found" }, status=404)

@csrf_exempt
def quote_detail_api(request, id):
    if request.method == "GET":
        all_quotes = Quote.objects.all()
        for q in all_quotes:
            if q.get("id") == id:
                return JsonResponse(q, status=200)
        return JsoNResponse({ "message": "Quote not found" }, status=404)
    elif request.method == "PUT":
        data = json.loads(request.body.decode('utf-8'))
        all_quotes = Quote.objects.all()
        for q in all_quotes:
            if q.get("id") == id:
                q["text"] = data.get("text")
                q["author"] = data.get("author")
                return JsonResponse(q, status=200)
        return JsonResponse({ "message": "Quote not found" }, status=404)
    elif request.method == "DELETE":
        all_quotes = Quote.objects.all()
        for i in range(len(all_quotes)):
            if all_quotes[i].get("id") == id:
                q = all_quotes.pop(i)
                return JsonResponse(q, status=200)
        return JsonResponse({ "message": "Quote not found" }, status=404)
