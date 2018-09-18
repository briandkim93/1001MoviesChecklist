from django.urls import include, path

from knox import views as knox_views
from rest_framework_social_oauth2 import views as rest_framework_social_oauth2_views

from . import views

urlpatterns = [
    path('api/movie/', views.MovieListView.as_view(), name='movie_list'),
    path('api/movie/<int:pk>/', views.MovieDetailView.as_view(), name='movie_detail'),

    path('api/auth/account/', views.AccountListView.as_view(), name='account_list'),
    path('api/auth/account/<int:pk>/', views.AccountDetailView.as_view(), name='account_detail'),

    path('api/auth/email/verify/', views.EmailVerifyView.as_view(), name='email_verify'),
    path('api/auth/email/verify/confirm/', views.EmailVerifyConfirmView.as_view(), name='email_verify_confirm'),
    
    path('api/auth/password/reset/', views.PasswordResetView.as_view(), name='password_reset'),
    path('api/auth/password/reset/confirm/', views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),

    path('api/auth/login/', views.LoginView.as_view(), name='knox_login'),
    path('api/auth/logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    
    path('api/auth/social/convert-token/', views.ConvertTokenFBView.as_view(), name='convert_token'),
    path('api/auth/social/revoke-token/', rest_framework_social_oauth2_views.RevokeTokenView.as_view(), name='revoke_token'),

    path('api/auth/refresh-token/', views.RefreshTokenView.as_view(), name='refresh_token')
]