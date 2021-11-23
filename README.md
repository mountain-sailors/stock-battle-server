# stock-battle-server

> A repository for zumazuma back-end

### How to run
```
npm run dev
```

###  Project management
####  Issue
- 이슈 등록 후 이슈를 기반으로 한 PR을 작성합니다.


####  Pull Request
- PR은 반드시 1명 이상의 Approve를 받아야 merge할 수 있습니다.


### Branch 관리 전략

> git flow에서 일부 차용한 브랜치 관리 전략을 사용합니다.

- `main` : production용 브랜치. 새 릴리즈를 진행할 때  `develop` 브랜치에서  `master` 로 머지 후 `tag` 명령을 이용하여 릴리즈 버전에 대해 명시하고 배포합니다.
- `develop` : 개발용 브랜치. `main` 을 제외한 모든 브랜치는 우선적으로 `develop` 브랜치로 머지됩니다.
- `feature` : 새로운 기능을 추가하는 브랜치.
  - 브랜치 이름은 `/` 뒤에 이슈번호를 적습니다. (`feature/1`, `hotfix/3`)
- `hotfix` : production에서 발생한 버그들을 고칠 때 사용하는 브랜치.


### Commit 규칙
- 언어는 영문으로 작성합니다.

- 커밋 메시지는 템플릿 (.github/commit_template.txt) 의 내용을 기준으로 작성합니다.

- 템플릿 적용 방법: git config commit.template .github/commit_template.txt
커밋 단위는 타이틀을 한 문장으로 작성할 수 있는가를 기준으로 합니다. (1개의 커밋에는 1개의 행위만)
