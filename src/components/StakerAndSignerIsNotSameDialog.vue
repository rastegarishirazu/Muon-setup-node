<template>
    <v-dialog width="500px" v-model="backToStakerDialog">
        <v-card min-height="324px" class="rounded-lg pb-5">
            <v-toolbar elevation="0">
                <v-spacer></v-spacer>
                <v-btn flat icon color="primary" @click="backToStakerDialog = false">
                    <v-icon color="#193154">fa fa-xmark</v-icon>
                </v-btn>
            </v-toolbar>
            <v-card-text class="text-black">
                <v-row>
                    <v-col class="d-flex justify-center">
                        <img src="@/assets/verification/switchAccount.svg" alt="">
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <p class="text-center text-18 px-5">To access your dashboard, please switch back to
                            your Staking Address ({{
                                addressToShort($route.params.staker) }})
                        </p>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { useVerificationsStore } from '@/stores/verifications';
import { useDashboardStore } from '@/stores/dashboardStore'
import { mapActions, mapWritableState } from 'pinia';

export default {
    name: 'StakerAndSignerIsNotSameDialog',
    methods: {
        ...mapActions(useDashboardStore, ['addressToShort'])
    },
    computed: {
        ...mapWritableState(useVerificationsStore, ['backToStakerDialog'])
    }
}
</script>

<style scoped>
.text-black {
    color: #323245 !important;
}
</style>