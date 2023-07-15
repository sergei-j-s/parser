<template>
  <div class="flex items-center justify-between gap-[5px] bg-[#efefef] text-[12px] rounded-[5px] px-[10px] py-[5px]">
    <div class="truncate">
      {{ item }}
    </div>
    <div>
      <a :href="item" target="_blank"><i class="ri-share-box-line text-[14px]"></i></a>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: String,
});
</script>
