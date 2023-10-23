<script setup name="I18nSelector">
import { useI18n } from 'vue-i18n'
import { getElementLocales } from '@/locales'
import useSettingsStore from '@/store/modules/settings'

const { locale } = useI18n()
const route = useRoute()

const settingsStore = useSettingsStore()

const locales = computed(() => getElementLocales())

const generateI18nTitle = inject('generateI18nTitle')

function languageCommand(command) {
  locale.value = command
  settingsStore.setDefaultLang(command)
  route.meta.title && settingsStore.setTitle(generateI18nTitle(route.meta.i18n, route.meta.title), false)
}
</script>

<template>
  <el-dropdown v-if="settingsStore.toolbar.enableI18n" class="language-container" size="default" @command="languageCommand">
    <slot />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="(item, index) in locales" :key="index" :disabled="settingsStore.app.defaultLang === item.name" :command="item.name">{{ item.labelName }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
