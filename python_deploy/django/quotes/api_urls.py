from django.urls import path
from . import views

# TODO 14: Define API URL patterns (no 'api/' prefix needed - include() adds it)
#   - 'quote/' -> random_quote_api (random quote)
#   - 'quotes/' -> quotes_api (GET all, POST new)
#   - 'quotes/<int:id>/' -> quote_detail_api (GET one, PUT, DELETE)

urlpatterns = [
    path('quote/', views.random_quote_api),
    path('quotes/', views.quotes_api),
    path('quotes/<int:id>/', views.quote_detail_api)
]