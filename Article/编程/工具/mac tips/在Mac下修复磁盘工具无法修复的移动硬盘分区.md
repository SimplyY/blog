发布时间：2015-11-20
更新时间：2015-11-20 18:04:03
[github 本博客项目](https://github.com/SimplyY/Blog/)
# 在Mac下修复磁盘工具无法修复的移动硬盘分区

## 引言
估计是给移动硬盘突然断电，移动硬盘的Time Machine的备份hfs+分区坏了，磁盘工具让我备份、格式化、还原。但这办法显然不好。

我搜出来的解决方案是根据这里来的
[http://blog.csdn.net/babyfacer/article/details/42740135](http://blog.csdn.net/babyfacer/article/details/42740135)
![](http://7xkpdt.com1.z0.glb.clouddn.com/eb311d8173ba610dd5da103347e25e0a.png)

然后，他写的太混乱了，这里记录一下精简的解决办法

## 步骤
1. diskutil list（找到你的分区的路径）
2. sudo fsck_hfs -fy /dev/disk1s2 （修复你的分区）

注意
![](http://7xkpdt.com1.z0.glb.clouddn.com/ed17fee157d6020069c38295ba829de5.png)

第二行命令的`/dev/disk1s2` 参数是根据第一行命令的输出来的。第二行命令的等待时间取决于备份分区的大小和硬盘读写速度，我200g等了二十来分钟，就好了。
