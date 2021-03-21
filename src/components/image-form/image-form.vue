<template>
  <div class="card o-hidden border-0 shadow-lg my-5 p-4">
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1>Image manager</h1>
    </div>

    <div class="card-body d-flex justify-content-center">
      <div class="p-5 w-100" style="max-width: 500px;">
        <add-image-form />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * Internal dependencies.
 */
import AddImageForm from '@/components/add-image-form/add-image-form';

export default {
  name: 'ImageForm',

  components: {
    AddImageForm,
  },
};
</script>
