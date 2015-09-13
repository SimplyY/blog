from django.shortcuts import render, render_to_response, redirect
from django.template import Context
from django.http import HttpResponse
from myBlog.models import *
from urllib.parse import unquote
from myBlog.article import set_tag_article

def get_context(current_tags=None, article_list=None, article=None):
    context = {"column_tag_list": Tag.objects.filter(is_column=True)}
    context.update({"tag_list": Tag.objects.all()})

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


def article_page(request, name):
    url = request.get_full_path()
    article_id = unquote(url.split('/')[-1])

    article = Article.objects.get(id=article_id)
    current_tags = get_current_tags(article.tag.name)

    return render_to_response('article.html', get_context(current_tags, article=article))


def author_page(request):
    return render_to_response('author.html', get_context())


def renew_article(request):
    set_tag_article()
    return HttpResponse('finish')


def get_article_list(tag_name):
    article_list = []
    for article in Article.objects.all():
        if article.tag.name == tag_name:
            article_list.append(article)
        elif article.tag.is_child_tag(tag_name):
            article_list.append(article)

    return article_list

def get_current_tags(tag_name):
    current_tags = []

    while tag_name:
        for tag in Tag.objects.all():
            if tag.name == tag_name:
                current_tags.insert(0, tag)
                if tag.parent_tag:
                    print(tag.parent_tag.name)
                    tag_name = tag.parent_tag.name
                else:
                    tag_name = None
                break

    return current_tags
