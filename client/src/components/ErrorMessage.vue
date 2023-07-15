<template>
  <div class="w-full h-full bg-white absolute top-0 left-0 z-[2000]">
    <div class="w-full text-[22px] text-[#737373] text-center mt-[-10px] absolute top-[50%]">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: String
});
</script>