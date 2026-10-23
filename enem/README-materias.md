# Matérias e classificação pessoal

O banco ENEM mantém as áreas originais e acrescenta 13 matérias específicas. O filtro **Matéria** combina com ano, área, idioma, busca e revisão. O nome da matéria aparece em cada questão. Questões interdisciplinares podem aparecer em mais de uma matéria.

A classificação é didática, sem pretensão de ser uma classificação oficial do Inep. `provenance/subjects.json` registra o método de cada item: área de Matemática, idioma, correspondência de texto com o [MMLU-PT](https://huggingface.co/datasets/mmlu-pt/mmlu-pt-high-school-full), sugestão automática de conteúdo ou conferência do tema. Não houve revisão humana integral. Sugestões automáticas também são identificadas no editor da questão.

**Classificar matéria**, disponível no ENEM e na Fuvest, permite substituir as matérias de uma questão por uma escolha pessoal. **Usar classificação do acervo** restaura as matérias originais. A edição é local ao navegador e acompanha a exportação/importação do progresso; não modifica a classificação pública para outros usuários. Importações antigas mantêm as classificações pessoais que já estão no navegador. Falhas de armazenamento mantêm a escolha anterior.

Para atualizar a classificação pública do ENEM, edite `enem/provenance/subjects.json` e rode:

```sh
python scripts/build-enem-subjects.py
node scripts/check-site.cjs
```

O gerador valida a cobertura exata dos IDs do acervo e os nomes de matéria antes de produzir `enem-subjects-data.js`. Ele não altera enunciados, alternativas, imagens ou gabaritos.
