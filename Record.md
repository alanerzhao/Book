## Record

#### Vim 配置自定义比较工具

     git config --global diff.tool vimdiff
     git config --global difftool.prompt false
     git config --global alias.d difftool` 使用时`git d file1

#### Vim 比较命令
    vimdiff mvimdiff gvimdiff
    :vertical diffsplit FILE_RIGHT

#### Vimdiff charset

    ]c :        - next difference
    [c :        - previous difference
    do          - diff obtain 与dp相反把另一个文件的差异复制到当前文件do (diff "get"，之所以不用dg，是因为dg已经被另一个命令占用了)
    dp          - diff put 当前文件的差异复制到另一个文件
    zo          - open folded text
    zc          - close folded text
    :diffupdate - re-scan the files for differences 重新比较文件

#### Vim 命令

    VU                  整行大写
    g~~                 整行大小写反转
    vEU                 单词转为大写
    vE~                 单词大小写反转
    ggguG               所有文本小写
    gggUG               所有文本大写    :browse e           图像化文件浏览器
    :1,10 w outfile     1到10行内容写到outfile
    :1,10 w >> outfile  1到10行内容追加到outfile
    :r infile           插入文件内容
    :23r infile         插入文件23行的内容
    grep class **/*.tpl  在所有tpl文件里查找class
    gf                  打开光标下文件名对应的文件
    :bn 和 :bp → 你可以同时打开很多文件，使用这两个命令来切换下一个或上一个文件。（陈皓注：我喜欢使用:n到下一个文件）
    ctrl + V  = → 自动给缩进 （陈皓注：这个功能相当强大，我太喜欢了）

#### vim正则匹配

    :%s/str1/str2/        用字符串 str2 替换行中首次出现的字符串 str1
    :s/str1/str2/g        用字符串 str2 替换行中所有出现的字符串 str1
    :.,$ s/str1/str2/g    用字符串 str2 替换正文当前行到末尾所有出现的字符串 str1
    :1,$ s/str1/str2/g    用字符串 str2 替换正文中所有出现的字符串 str1
    :g/str1/s//str2/g     功能同上
    :m,ns/str1/str2/g     将从m行到n行的str1替换成str2

 * 将空格转化为制表符的命令则恰好相反：

    :set noexpandtab
    :%retab!

 * 制表符转空格

    :set expandtab
    :%retab
    排版注释
    gq]/


#### shell 命令

    文件内容查找
        grep content files 

    chrome 更改css类型可以按住shift键点击颜色

    ssh 登录到服务器
    ssh zhaoshuai@192.168.1.99

    更改权限

    chmod -R 777 /
    chown -R www:www
    切换到root
    sudo su - 
    
    解压zip
    unzip js\ css3.zip -d aa
    压缩
    zip  压缩文件名 源文件名
    cd -          #回到上次所在目录，这个技巧我原来还真是不知道，感觉还是比较有用，省略了很多输入。
    cd            #回到主目录
    cd ~          #同样也是回到主目录

    wget -r -p -np -k http://xxx.com/xxx
    -r,  --recursive（递归）          specify recursive download.（指定递归下载）

    -k,  --convert-links（转换链接）      make links in downloaded HTML point to local files.（将下载的HTML页面中的链接转换为相对链接即本地链接）
    -p,  --page-requisites（页面必需元素）    get all images, etc. needed to display HTML page.（下载所有的图片等页面显示所需的内容）
    -np, --no-parent（不追溯至父级）          don't ascend to the parent directory.

#### chrome 
  * @http://devtoolstips.com/

    在source模式下command +d 可以替换下一个
    在elemet面板的css面板的最下方有查找css属性的搜索
    在element下搜索html 可以用> 查找子元素
    command + click 多列操作
    可以托动代码到编辑器
    alt多列操作
    command + click 定位css文件位置
    shift + css 面板颜色的图片可以更改rgba hsl等
    command + css 颜色前的面板可以获得页面的颜色
    alt + click 节点展开多级


