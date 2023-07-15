<template>
  <div class="max-w-[600px] m-auto">
    <div class="relative">
      <el-select v-model="select" :disabled="loading" filterable clearable value-key="id" size="large" placeholder="Выбрать URL" no-match-text="Ничего не найдено" class="w-full">
        <el-option v-for="e in options" :key="e.id" :label="e.title" :value="e">
          <span class="float-left">{{ e.title }}</span>
          <span class="float-right text-[11px] text-[#939393]">{{ e.url }}</span>
        </el-option>
      </el-select>
      <el-button v-on:click="dialog = true" size="large" circle plain class="absolute right-[-50px]">
        <i class="ri-add-line text-[22px]"></i>
      </el-button>
    </div>
    <div class="w-full h-[calc(100vh-120px)] bg-white border border-[#dcdfe6] rounded-[4px] mt-[20px] overflow-hidden relative">
      <Loading v-if="loading" />
      <ErrorMessage v-if="error_message" :error="error_message" />
      <div v-if="list[select.id]">
        <el-scrollbar class="h-[calc(100vh-120px)]">
          <div class="mb-[40px]">
            <ItemTitle :title="'JS'" :count="list[select.id].js.length"/>
            <div class="flex flex-col gap-[5px] px-[20px]">
              <ItemURL v-for="e in list[select.id].js" :key="e" :item="e"/>
            </div>
          </div>
          <div class="mb-[40px]">
            <ItemTitle :title="'CSS'" :count="list[select.id].css.length"/>
            <div class="flex flex-col gap-[5px] px-[20px]">
              <ItemURL v-for="e in list[select.id].css" :key="e" :item="e"/>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
    <Dialog v-on:dialogClose="dialog = $event" v-on:optionAdd="options.push($event)" :dialog="dialog" />
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';
import Loading from '@/components/Loading.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';
import ItemURL from '@/components/ItemURL.vue';
import ItemTitle from '@/components/ItemTitle.vue';
import Dialog from '@/components/Dialog.vue';
import ApiService from '@/services/api.service';

const loading = ref(false);
const select = ref('');
const dialog = ref(false);
const error_message = ref('');
const list = reactive({});
const options = reactive([
  {
    id: 1,
    url: 'https://github.com',
    title: 'github.com',
  },
  {
    id: 2,
    url: 'https://google.com',
    title: 'google.com',
  },
  {
    id: 3,
    url: 'https://yandex.ru',
    title: 'yandex.ru',
  },
]);

const getParseList = () => {
  let { id, url } = select.value;

  if (url && !list[id]) {
    loading.value = true;
    let formData = { url };

    ApiService.getList(formData)
      .then((res) => {
        list[id] = res.data.list;
        loading.value = false;
      })
      .catch((error) => {
        loading.value = false;
        if(error.code == 'ERR_NETWORK') {
          error_message.value = 'Сервер недоступен';
        };
        if(error.response.status == 400) {
          if(error.response.data.err == 'ссылка не валидна'){
            error_message.value = error.response.data.err;
          };
        };
        console.log((error.response && error.response.data) || error.message || error.toString());
      });
  }
};

watch(select, (newValue) => {
  if(newValue && newValue.id){
    error_message.value = '';
    getParseList();
  };
});
</script>

<style scoped></style>
