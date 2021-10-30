set dir=/home/sana/.vim/backup
set tabstop=2 softtabstop=2
set shiftwidth=2
set guicursor=

set noswapfile
set nobackup
set undodir=~/.vim/undodir
set undofile  

set expandtab
set smartindent
set number
set relativenumber
set hlsearch

"set nowrap
"set wrap linebreak nolist
set textwidth=80
set breakindent
let &showbreak='  '

"set cursorline
set nu
set nohlsearch

set incsearch
set scrolloff=8


call plug#begin('~/.vim/plugged')

Plug 'gruvbox-community/gruvbox'
Plug 'preservim/nerdtree'
Plug 'mattn/emmet-vim'
"Plug 'nvim-telescope/telescope.nvim'

call plug#end()

"colorscheme gruvbox

nnoremap <C-n> :NERDTree<CR>
nnoremap <C-f> :NERDTreeFind<CR>
"let g:user_emmet_leader_key='Tab'

