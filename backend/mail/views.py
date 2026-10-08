from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def status(request):
    return Response({"status": "ok", "message": "ProAssist is running!"}, status=200)


@api_view(['POST'])
def send_email(request):
    recipient = request.data.get('recipient')
    subject = request.data.get('subject')
    message = request.data.get('body')

    if not recipient or not subject or not message:
        return Response({"error": "Recipient, subject, and message are required."}, status=400)
    print(
        f"Sending email to {recipient} with subject '{subject}' and message '{message}'")

    return Response({
        "status": "success",
        "message": "Email sent successfully.",
        "email": {
            "recipient": recipient,
            "subject": subject,
            "message": message
        }
    })
