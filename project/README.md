Atividade 6: Gulp
=================

Para configurar o ambiente com virtualbox e vagrant:

```
vagrant up
```

Para rodar o projeto e o gulp, acesse a pasta `/vagrant/project`, utilize:

```
npm run gulp
```

## Plugins

O ambiente já vem  equipado com os seguintes plugins, esteje livre para utilizar
outros.

- browser-sync: faz o auto-reload / sincronização do browser de acordo com a modificação dos assets
- del: deleta arquivos e pastas
- gulp-cssnano: minifica arquivos css
- gulp-sass: pré-processa arquivos SASS e SCSS para arquivos CSS
- gulp-uglify: "uglifica" arquivos Javascript
- gulp-useref: combina arquivos Javascripts ou CSS em um arquivo só
- run-sequence: executa tarefas de maneira sincrona
