from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, OverdueTaskList
from django.urls import path

router = DefaultRouter()
router.register(r'', TaskViewSet, basename='task')

urlpatterns = [
    path('overdue/', OverdueTaskList.as_view(), name='overdue-tasks'),  # <-- add this line
]

urlpatterns += router.urls
