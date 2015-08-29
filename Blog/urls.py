
from django.conf.urls import include, url
from django.contrib import admin
from myBlog.views import *

urlpatterns = [
    url(r'^$', root),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^home$', home_page),
    url(r'^tag/', tag_page, name='tags'),
    url(r'^article/([0-9]+)/$', article_page, name='articles'),
]
