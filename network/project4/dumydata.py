# Run `python manage.py shell` and paste this snippet

from network.models import Post, User

user1 = User.objects.all()[0]
user2 = User.objects.all()[1]


for i in range(10):
    text = f"Sample Post No{i+1} by "
    post = Post(user=user1, post=text+user1.username)
    post.save()
    print(post.post)
    post = Post(user=user2, post=text+user2.username)
    post.save()
    print(post.post)
    print()
