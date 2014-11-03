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

