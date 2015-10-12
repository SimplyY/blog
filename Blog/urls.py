
from django.conf.urls import include, url
from django.contrib import admin
from myBlog.views import *


urlpatterns = [
    url(r'^$', home_page),
    url(r'^blog$', home_page),
    url(r'^blog/admin', include(admin.site.urls)),
    url(r'^blog/home$', home_page),
    url(r'^blog/tag/', tag_page),
    url(r'^blog/article/', article_page),
    url(r'^renew_article$', renew_article),
    url(r'^blog/renew_article$', renew_article),
    url(r'^blog/author$', author_page),
    url(r'^blog/add_love_number/', add_love_number),
    url(r'^blog/add_share_number/', add_share_number),
    url(r'^contribute$', contribute),
    url(r'^contribute/qq_callback$', contribute_qq_sign),
]
