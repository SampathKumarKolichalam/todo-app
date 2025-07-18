from rest_framework import viewsets, permissions
from .models import Task
from .serializers import TaskSerializer

from django.contrib.auth.models import User
from rest_framework import serializers, generics
from rest_framework import permissions as drf_permissions  # avoid clash

# --- Overdue Tasks API ---
from rest_framework.views import APIView
from rest_framework.response import Response

class OverdueTaskList(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        overdue_tasks = Task.objects.overdue(user=request.user)
        serializer = TaskSerializer(overdue_tasks, many=True)
        return Response(serializer.data)

# --- Your existing views ---

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = User
        fields = ['username', 'password', 'email']
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user

class RegisterAPIView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [drf_permissions.AllowAny]
