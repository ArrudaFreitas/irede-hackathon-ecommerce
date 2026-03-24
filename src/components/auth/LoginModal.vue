<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth.store'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Message from 'primevue/message'

const props = defineProps<{ visible: boolean }>()
const emit = defineEmits<{
    'update:visible': [value: boolean]
}>()

const auth = useAuthStore()

const username = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

async function handleLogin() {
    if (!username.value || !password.value) {
        errorMsg.value = 'Preencha usuário e senha.'
        return
    }

    loading.value = true
    errorMsg.value = ''

    try {
        await auth.login({ username: username.value, password: password.value })
        emit('update:visible', false)
        username.value = ''
        password.value = ''
    } catch (e) {
        errorMsg.value = 'Usuário ou senha inválidos.'
    } finally {
        loading.value = false
    }
}

function close() {
    emit('update:visible', false)
    errorMsg.value = ''
}
</script>

<template>
    <Dialog :visible="props.visible" @update:visible="close" modal header="Entrar na sua conta"
        :style="{ width: '24rem' }" :draggable="false">
        <div class="flex flex-col gap-4 pt-2">
            <Message v-if="errorMsg" severity="error" :closable="false">
                {{ errorMsg }}
            </Message>

            <div class="flex flex-col gap-1">
                <label for="username" class="text-sm font-medium">Usuário</label>
                <InputText id="username" v-model="username" placeholder="emilys" :disabled="loading"
                    @keyup.enter="handleLogin" />
            </div>

            <div class="flex flex-col gap-1">
                <label for="password" class="text-sm font-medium">Senha</label>
                <Password id="password" v-model="password" placeholder="emilyspass" :feedback="false" toggleMask
                    :disabled="loading" @keyup.enter="handleLogin" class="w-full" inputClass="w-full" />
            </div>

            <small class="text-center text-muted-color">
                Outros usuários disponíveis na
                
                <a href="https://dummyjson.com/docs/users"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-primary underline"
                >
                    documentação do DummyJSON
                </a>
  . A senha segue o padrão <code>nomeuserpass</code>.
</small>

            <Button label="Entrar" icon="pi pi-sign-in" :loading="loading" @click="handleLogin" class="w-full mt-2" />
        </div>
    </Dialog>
</template>