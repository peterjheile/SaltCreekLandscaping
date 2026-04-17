from rest_framework import serializers
from .models import *

class ContactMessageSerializer(serializers.ModelSerializer):
    hp = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = ContactMessage
        fields = ["name", "email", "phone", "subject", "message", "hp"]

    def create(self, validated_data):
        validated_data.pop("hp", None)
        return ContactMessage.objects.create(**validated_data)
    



class QuoteRequestSerializer(serializers.ModelSerializer):
    hp = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = QuoteRequest
        fields = [
            "name",
            "email",
            "phone",
            "service_category",
            "message",
            "hp",
        ]

    def create(self, validated_data):
        validated_data.pop("hp", None)
        return QuoteRequest.objects.create(**validated_data)