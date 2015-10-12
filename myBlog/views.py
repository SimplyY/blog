from django.shortcuts import render, render_to_response, redirect
from django.template import Context
from django.http import HttpResponse
from myBlog.models import *
from urllib.parse import unquote
from myBlog.article import set_tag_article

import time
import os

def get_context(current_tags=None, article_list=None, article=None):
    tag_list = Tag.objects.all()
    first_tag_list = [
        Tag.objects.get(name="编程"),
        Tag.objects.get(name="生活"),
        Tag.objects.get(name="电影"),
        Tag.objects.get(name="诗集")]

    context = {"column_tag_list": Tag.objects.filter(is_column=True)}
    context.update({"first_tag_list": first_tag_list})
    context.update({"tag_list": tag_list})

    if current_tags:
        context.update({"current_tags": current_tags})
    if article_list:
        context.update({"article_list": article_list})
    if article:
        context.update({"article": article})

    return context


def home_page(request):
    current_tags = Tag.objects.filter(name='编程')
    article_list = get_article_list('编程')
    return render_to_response('article-list.html', get_context(current_tags, article_list=article_list))

def tag_page(request):
    url = request.get_full_path()
    tag_name = unquote(url.split('/')[-1])

    article_list = get_article_list(tag_name)
    current_tags = get_current_tags(tag_name)

    return render_to_response('article-list.html', get_context(current_tags, article_list=article_list))


def article_page(request):
    url = request.get_full_path()
    article_url = unquote(url.split('/')[-1])
    article_title = article_url + '.md'

    article = Article.objects.get(title=article_title)
    current_tags = get_current_tags(article.tag.name)

    return render_to_response('article.html', get_context(current_tags, article=article))

def add_love_number(request):
    url = request.get_full_path()
    added_article_title = unquote(url.split('/')[-1])

    article = Article.objects.get(title=added_article_title)
    article.love_number += 1
    article.save()

    return HttpResponse(article.love_number)

def add_share_number(request):
    url = request.get_full_path()
    added_article_title = unquote(url.split('/')[-1])

    article = Article.objects.get(title=added_article_title)
    article.share_number += 1
    article.save()

    return HttpResponse(article.share_number)

def author_page(request):
    return render_to_response('author.html', get_context())


def get_article_list(tag_name):
    article_list = []
    for article in Article.objects.all():
        if article.tag.name == tag_name:
            article_list.append(article)
        elif article.tag.is_child_tag(tag_name):
            article_list.append(article)

    article_list = sorted(article_list, key=lambda article: time.mktime(time.strptime(article.pub_date,"%Y-%m-%d\n")), reverse=True)

    for article in article_list:
        article.url = article.title.split('.md')[0]

    return article_list

def get_current_tags(tag_name):
    current_tags = []

    while tag_name:
        for tag in Tag.objects.all():
            if tag.name == tag_name:
                current_tags.insert(0, tag)
                if tag.parent_tag:
                    tag_name = tag.parent_tag.name
                else:
                    tag_name = None
                break

    return current_tags


def renew_article(request):
    file_name = "myBlog/last_renew_time.txt"

    last_renew_time = get_last_renew_time(file_name)
    now = time.time()
    if now - last_renew_time > 60:
        set_tag_article()
        set_last_renew_time(now, file_name)
        return HttpResponse('finish')
    else:
        return HttpResponse('renew_article in 60s is illegal')


def get_last_renew_time(file_name):
    if not os.path.isfile(file_name):
        with open(file_name, "w") as f:
            f.write('''1444169764.775339

    // very important for limit renew_article and can't be delete''')

    with open(file_name, "r") as f:
        a = f.readline()
    return float(a)

def set_last_renew_time(now, file_name):
    with open(file_name, "w") as f:
        f.write(str(now) + '''

// very important for limit renew_article and can't be delete''')


def contribute(request):
    return render(request, 'contribute.html')

def contribute_qq_sign(request):
    return render(request, 'qqSignCallback.html')
