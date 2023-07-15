<template>
  <el-divider content-position="left">
    <el-badge :value="count" class="item">
      <div class="pr-[15px]">{{ title }}</div>
    </el-badge>
  </el-divider>
</template>

<script setup>
const props = defineProps({
  title: String,
  count: Number
});
</script>