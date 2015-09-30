
from django.conf.urls import include, url
from django.contrib import admin
from myBlog.views import *

urlpatterns = [
    url(r'^$', home_page),
    url(r'^blog/admin/', include(admin.site.urls)),
    url(r'^blog/home$', home_page),
    url(r'^blog/tag/', tag_page, name='tags'),
    url(r'^blog/article/([0-9]+)$', article_page, name='articles'),
    url(r'^blog/renew_article$', renew_article),
    url(r'^blog/author$', author_page)
]
