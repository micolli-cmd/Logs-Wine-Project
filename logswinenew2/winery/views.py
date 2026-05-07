from django.shortcuts import render
from django.core.mail import send_mail
from django.contrib import messages
from django.conf import settings

def age_gate(request):
    return render(request, 'winery/age_gate.html')

def home(request):
    return render(request, 'home.html')

def about(request):
    return render(request, 'about.html')

def contact(request):
    context = {}

    if request.method == 'POST':
        name = request.POST.get('name', '').strip()
        email = request.POST.get('email', '').strip()
        subject = request.POST.get('subject', 'Contact from website')
        message_body = request.POST.get('message', '').strip()

        if name and email and message_body:
            # Prepare email content
            full_message = f"""
    New message from the website:

    Name: {name}
    Email: {email}
    Subject: {subject}

    Message:
    {message_body}
                """

            try:
                send_mail(
                    subject=f"[LOGS Wine Contact] {subject}",
                    message=full_message,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[settings.EMAIL_HOST_USER],  # your Gmail
                    fail_silently=False,
                )

                # Success message with the person's name
                messages.success(
                    request,
                    f"Thank you, {name}! Your message has been sent successfully. "
                    "We will get back to you as soon as possible."
                )
            except Exception as e:
                messages.error(request, f"Sorry, there was a problem sending your message. Please try again.")
        else:
            messages.error(request, "Please fill in all required fields.")

    return render(request, 'contact.html', context)

def wines(request):
    return render(request, 'wines.html')

def events(request):
    return render(request, 'events.html')

def recipe(request):
    return render(request, 'recipe.html')

def shop(request):
    return render(request, 'shop.html')