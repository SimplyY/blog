from django.shortcuts import render, render_to_response, redirect
from django.template import Context
from myBlog.models import *
from urllib.parse import unquote

def root(request):
    return redirect('/home')


def home_page(request):
    current_tags = Tag.objects.filter(name='编程')
    print(current_tags)
    return render_to_response('home.html', Context({"article_list": Article.objects.all(), "current_tags": current_tags}))


def tag_page(request):
    url = request.get_full_path()
    tag_name = unquote(url.split('/')[-1])

    article_list = []
    current_tags = []

    for article in Article.objects.all():
        print(article.tag.name)
        if article.tag.name == tag_name:
            current_tags = article.tag.get_tags()
            article_list.append(article)
        elif article.tag.is_child_tag(tag_name):
            article_list.append(article)

    if not current_tags:
        for tag in Tag.objects.all():
            if tag.name == tag_name:
                current_tags.append(tag)

    print(article_list)
    print(current_tags)
    return render_to_response('home.html', Context({"article_list": article_list, "current_tags": current_tags}))


def article_page(request, name):
    print(request.get_full_path())
    return redirect('/home')
