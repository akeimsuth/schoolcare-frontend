<template>
  <VContainer fluid class="fill-height">
    <VRow no-gutters align="center" justify="center" class="fill-height">
      <VCol cols="12" md="6" lg="5" sm="6">
        <VRow no-gutters align="center" justify="center">
          <VCol cols="12" md="6">
            <h1>Sign In</h1>
            <p class="text-medium-emphasis">Enter your details to get started</p>

            <VForm @submit.prevent="submit" class="mt-7">
              <div class="mt-1">
                <label class="label text-grey-darken-2" for="email">Email</label>
                <VTextField
                  :rules="[ruleRequired, ruleEmail]"
                  v-model="email"
                  prepend-inner-icon="fluent:mail-24-regular"
                  id="email"
                  name="email"
                  type="email"
                />
              </div>
              <div class="mt-1">
                <label class="label text-grey-darken-2" for="password">Password</label>
                <VTextField
                  :rules="[ruleRequired, rulePassLen]"
                  v-model="password"
                  prepend-inner-icon="fluent:password-20-regular"
                  id="password"
                  name="password"
                  type="password"
                />
              </div>
              <div class="mt-5">
                <VBtn :loading="validating" type="submit" block min-height="44" class="gradient primary">Sign In</VBtn>
              </div>
            </VForm>
            <p class="text-body-2 mt-10">
              <NuxtLink to="/reset-password" class="font-weight-bold text-primary"
                >Forgot password?</NuxtLink
              >
            </p>
          </VCol>
        </VRow>
      </VCol>
      <VCol class="hidden-md-and-down fill-height" md="6" lg="7">
        <VImg
          src="https://wallpaper.dog/large/5557744.jpg"
          cover
          class="h-100 rounded-xl d-flex align-center justify-center"
        >
          <div class="text-center w-50 text-white mx-auto">
            <h2 class="mb-4">Welcome Back!</h2>
          </div>
        </VImg>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup>
const { login } = useStrapiAuth();
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const email = ref("");
const password = ref("");
const validating = ref(false);
const { ruleEmail, rulePassLen, ruleRequired } = useFormRules();

const submit = async () => {
  try {
    validating.value = true;
    await login({ identifier: email.value, password: password.value })
    await navigateTo('/admin');
  } catch (e) {
    validating.value = false;
    toast("User Not Found!", {
        autoClose: 2000,
        type: toast.TYPE.ERROR,
        position: toast.POSITION.TOP_LEFT
      });
    console.log('User not Found!');
  }

};
</script>
