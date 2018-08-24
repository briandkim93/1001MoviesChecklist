from rest_framework.serializers import ModelSerializer

from .models import Account, Movie
from .data import MOVIE_DATA

class AccountSerializer(ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'
        read_only_fields = ('id', 'last_login', 'is_superuser', 'first_name', 'last_name', 'is_staff', 'is_active', 'date_joined', 'groups', 'user_permissions')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        new_account = Account(username = validated_data['username'], email = validated_data['email'])
        new_account.set_password(validated_data['password'])
        new_account.save()

        for movie in MOVIE_DATA:
            new_account.movie_set.create(
                title = movie['title'],
                image_path = movie['image_path'],
                summary = movie['summary'],
                release_year = movie['release_year'],
                length = movie['length'],
                genres = movie['genres'],
                imdb_url = movie['imdb_url'],
            )

        return new_account

    def update(self, instance, validated_data):
        instance.email = validated_data['email']
        instance.set_password(validated_data['password'])
        instance.save()

        return instance

class MovieSerializer(ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'