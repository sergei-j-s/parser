<template>
  <el-dialog v-model="show" title="Добавить ссылку" width="30%">
    <div class="flex flex-col gap-[5px]">
      <el-input v-model.trim="title" placeholder="Название ресурса">
        <template #prepend>
          <div class="w-[80px] text-center">Название</div>
        </template>
      </el-input>
      <el-input v-model.trim="url" placeholder="Ссылка на ресурс">
        <template #prepend>
          <div class="w-[80px] text-center">URL</div>
        </template>
      </el-input>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button v-on:click="closeDialog()">Отмена</el-button>
        <el-button v-on:click="optionAdd()" type="success" plain :disabled="!stateFormDialog">Добавить</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  dialog: Boolean,
});

const emits = defineEmits(['optionAdd', 'dialogClose']);

const show = ref(false);
const title = ref('');
const url = ref('');

const optionAdd = () => {
  let option = {
    id: Date.now(),
    title: title.value,
    url: url.value,
  };

  title.value = '';
  url.value = '';

  emits('optionAdd', option);
  closeDialog();
};

const closeDialog = () => {
  emits('dialogClose', false);
};


const stateFormDialog = computed(() => {
  return title.value && url.value ? true : false;
});

watch(show, (newValue) => {
  if(!show.value && props.dialog){
    emits('dialogClose', false);
  };
});

watch(
  () => props.dialog,
  (newValue) => {
    show.value = newValue;
  }
);
</script>
