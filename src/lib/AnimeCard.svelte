<script>
  export let animeName;
  export let coverImage;
</script>

<div>
  <div class="min-h-[480px]">
    <div class="relative inline-block w-full">
      <img
        src={coverImage}
        alt="Test"
        class="shadow-lg w-full h-auto px-2 py-2"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
      ></div>
    </div>
    <div class="text-white mt-0.5 text-[16px] leading-6">
      {animeName}
    </div>
    <div class="text-[#a0a0a0] mt-0.5 text-[16px] leading-6">Sub | Dub</div>
  </div>
</div>
