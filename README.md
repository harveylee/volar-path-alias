# Volar Project References & Path Aliases

## Description
- pnpm monorepos setup
  - packages are in `packages/`
  - packages are setup with `"composite": true` in `tsconfig.json`
- `@my/app` package (in `packages/app`) references `@my/lib` (in `packages/lib`)
  - As a workspace dependency in `package.json`; and
  - A project reference in `packages/app/tsconfig.json`
- `@my/lib` has a path alias set up in `packages/lib/tsconfig.json` which points `~/*` to `src/*` (via the `baseUrl`)
- `@my/lib` has two classes `Foo` and `Bar`
  - `Bar` extends `Foo`
  - The `import` statement in `bar.ts` uses the `~` path alias to avoid `..` in `../../other/subpath/foo.ts`
- in `@my/app` we use `vite-tsconfig-paths` to allow `vite` to understand path aliases from `tsconfig.json`

## Reproduction
1. Use Volar in Take Over mode
2. Navigate VS Code to `packages/app/src/main.ts`
3. Mouseover on `@my/lib` on line 5. Volar complains:
    ```
    Output file 'blah/volar-path-alias/packages/lib/src/index.d.ts' has not been built from source file 'blah/volar-path-alias/packages/lib/src/index.ts'.ts(6305)
    ```
5. Try setting `noProjectReferences` to `true` in `volar-path-alias.code-workspace` and reload the window
6. The error has gone away and `foo` is now correctly typed on mouseover as `Foo`, but `bar` is typed as `any`
    - I think the reason why `Foo` is correctly typed is because it *doesn't* use the `~` path alias in its import/export chain, whilst `Bar` is incorrectly typed because it *does* use the `~` path alias.
7. Turn off Take Over mode by enabling the builtin Typescript language features and reload the window
8. Note that `foo` and `bar` are correctly typed when you mouseover them now, implying that the builtin Typescript is correctly understanding the project reference and path alias

----

Original README from `pnpm create vite`

# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.
