<template>
    <div>
        <div class="home"><router-link to="/">
                <div class="back"><i class="icon fa-solid fa-arrow-left"></i> Kembali</div>
            </router-link></div>
        <div class="bismillah">﷽</div>
        <div class="judul" align="center">{{ allData.nama_latin }} | {{ allData.nama }}</div>
        <div class="row">
            <button class="audio" @click="playAudio"> <i v-if="!audioPlay" class="icon fa-solid fa-play"></i><i
                    v-if="this.audioPlay" class=" icon fa-solid fa-pause"></i> Play Audio</button>
            <div class="save"></div>
        </div>
        <div class="card-container">
            <div class="card" v-for="(i, no) in suratData" :key="no">
                <div class="menu">
                    <div class="nomor"><small>{{ i.surah }}:{{ i.nomor }}</small></div>
                    <!-- <div class="list-menu" @click="menu">...</div> -->
                </div>
                <div class="arab">{{ i.ar }}</div>
                <div class="terjemahan">{{ i.idn }}</div>
            </div>
        </div>
        <div class="footer" align="center">
            <small>made with ♥ by M Radya Iftikhar</small>
        </div>



    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'app',
    data() {
        return {
            allData: {},
            suratData: {},
            audio: null,
            audioPlay: false,
            popUp: false,
        }
    },
    mounted() {
        this.getSurat(this.$route.params.id)
    },
    methods: {
        getSurat(id) {
            axios.get(`https://quran-api.santrikoding.com/api/surah/${id}`)
                .then(
                    (response) => {
                        this.allData = response.data
                        this.suratData = response.data.ayat
                        this.audio = new Audio(response.data.audio)
                    }
                )
        },
        playAudio() {
            try {
                if (!this.audioPlay) {
                    this.audioPlay = true
                    this.audio.play()
                } else {
                    this.audioPlay = false
                    this.audio.pause()
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style scoped>
.home {
    /* border: 1px solid white; */
    padding: 20px 0 20px 0;
}

.home .back {
    padding: 10px 20px;
    background-color: #424769;
    border: none;
    margin-left: 20px;
    border-radius: 20px;
    cursor: pointer;
    width: fit-content;
}

.bismillah {
    /* border: 1px solid white; */
    width: 100%;
    text-align: center;
    font-size: 2rem;
}

.judul {
    margin-top: 10px;
}

.audio {
    padding: 10px 20px;
    background-color: #424769;
    border: none;
    border-radius: 20px;
    margin-left: 20px;
    margin-top: 20px;
    cursor: pointer;
}

.card-container {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.card {
    margin-top: 20px;
    width: 90%;
    height: auto;
    padding-bottom: 10px;
    border-bottom: 1px solid #424769;
}

.card .menu {
    display: flex;
    justify-content: space-between;
}

.card .menu .list-menu {
    cursor: pointer;
}

.card .arab {
    /* border: 1px solid yellow; */
    text-align: right;
    font-size: 1.5rem;
    padding: 10px 0 10px 0;
    height: auto;
}

.icon {
    background-color: #424769;
}
</style>