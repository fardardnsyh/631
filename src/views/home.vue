<template>
    <div>
        <div class="title">
            <h1>MyAlquran</h1>
        </div>
        <div class="search">
            <input type="text" placeholder="Mau baca surah apa?..." v-model="search">
        </div>
        <div class="baru_dibaca">
            <p>Baru dibaca</p>
            <div class="card" @click="baca(baru_dibaca.nomor)" v-if="baru_dibaca">
                <div class="nomor">{{ baru_dibaca.nomor }}</div>
                <div class="surat">
                    <div class="nama_surat">{{ baru_dibaca.nama_latin }}</div>
                    <div class="terjemahan"><small>{{baru_dibaca.arti}}</small></div>
                </div>
                <div class="ayat">{{baru_dibaca.jumlah_ayat}} Ayat</div>
            </div>
        </div>
        <div class="menu">
            <div class="surat" :class="{ 'selected': this.currentDisplay == 'surat' }" @click="displaySurah">Surah</div>
            <div class="disimpan" :class="{ 'selected': this.currentDisplay == 'disimpan' }" @click="displayDisimpan">
                Disimpan</div>
        </div>
        <p align="center" v-if="this.currentDisplay == 'disimpan'" style="margin-top: 20px;">Ups belum bisa 😀</p>
        <div class="list_surat" v-if="this.currentDisplay == 'surat'">

            <div class="card" v-for="(i, no) in filterSurat" :key="no" @click="baca(i.nomor)">
                <div class="nomor">{{ i.nomor }}</div>
                <div class="surat">
                    <div class="nama_surat">{{ i.nama_latin }}</div>
                    <div class="terjemahan"><small>{{ i.arti }}</small></div>
                </div>
                <div class="ayat"><small>{{ i.jumlah_ayat }} Ayat</small></div>
            </div>

        </div>
        <div class="footer" align="center" v-if="currentDisplay != 'disimpan'">
            <small>Made with ♥ by M Radya Iftikhar</small>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'app',
    data() {
        return {
            surat_list: {},
            search: '',
            currentDisplay: 'surat',
            baru_dibaca: JSON.parse(localStorage.getItem('baru_dibaca'))
        }
    },
    computed: {
        filterSurat() {
            let filtered = this.surat_list
            if (this.search) {
                filtered = filtered.filter(i => i.nama_latin.toLowerCase().toString().includes(this.search.toLowerCase()))
            }
            return filtered
        }
    },
    mounted() {
        this.getSurat()
        // console.log(this.baru_dibaca.nama_latin)
    },
    methods: {
        displaySurah() {
            console.log('Display Surat')
            this.currentDisplay = 'surat'
        },
        displayDisimpan() {
            console.log('Display Disimpan')
            this.currentDisplay = 'disimpan'
        },
        getSurat() {
            axios.get('https://quran-api.santrikoding.com/api/surah').then(
                (response) => {
                    this.surat_list = response.data
                }
            )
        },
        baca(i) {
            axios.get(`https://quran-api.santrikoding.com/api/surah/${i}`)
                .then(
                    (response) => {
                        // console.log(response.data)
                        const data = {
                            nomor: response.data.nomor,
                            nama_latin: response.data.nama_latin,
                            arti: response.data.arti,
                            jumlah_ayat: response.data.jumlah_ayat,
                        }
                        localStorage.setItem('baru_dibaca', JSON.stringify(data))
                    }
                )
            this.$router.push(`/baca/${i}`)
        }
    }
}
</script>

<style scoped>
.title h1 {
    text-align: center;
    margin-top: 20px;
    font-size: 2.5rem;
}

.search {
    /* border: 1px solid green; */
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.search input {
    border: none;
    background-color: #ffffff;
    width: 80%;
    height: 50%;
    border-radius: 20px;
    padding-left: 20px;
    color: #040D12;
    font-size: 1.1rem;
}

.baru_dibaca {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* border: 1px solid white; */
    width: 100%;
    height: auto;
    padding-bottom: 10px;
}

.baru_dibaca p {
    margin-left: 15px;
    border-bottom: 1px solid white;
    padding: 5px;
    width: fit-content;
}

.baru_dibaca .card {
    cursor: pointer;
    margin-top: 10px;
    border: 1px solid #424769;
    margin-left: 15px;
    width: 90%;
    height: auto;
    padding: 10px 0 10px 0;
    display: flex;
    justify-content: flex-start;
    transition: transform 0.3s;
}

.baru_dibaca .card:hover {
    transform: scale(1.01);
}

.baru_dibaca .card .nomor {
    background-color: #424769;
    width: 10px;
    height: 10px;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bolder;
    border-radius: 20px;
    margin-left: 10px;
}

.baru_dibaca .surat {
    margin-left: 10px;
}

.baru_dibaca .surat .nama_surat {
    /* font-size: 1.1rem; */
    margin-right: 100px;
    width: 100%;
}

.baru_dibaca .ayat {
    /* border: 1px solid greenyellow; */
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    width: 100%;
}

.menu {
    /* border: 1px solid white; */
    width: 100%;
    height: auto;
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
}

.menu .surat {
    padding: 10px;
    cursor: pointer;
}

.menu .disimpan {
    /* border-bottom: 1px solid white; */
    padding: 10px;
    cursor: pointer;
}

.list_surat {
    z-index: 999;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* border: 1px solid white; */
    width: 100%;
    height: auto;
    padding-bottom: 10px;
}

.list_surat .card {
    cursor: pointer;
    margin-top: 10px;
    border: 1px solid #424769;
    margin-left: 15px;
    width: 90%;
    height: auto;
    padding: 10px 0 10px 0;
    display: flex;
    justify-content: flex-start;
    transition: transform 0.3s;
    z-index: 999;
}

.list_surat .card:hover {
    transform: scale(1.02);
}

.list_surat .card .nomor {
    background-color: #424769;
    width: 10px;
    height: 10px;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bolder;
    border-radius: 20px;
    margin-left: 10px;
}

.list_surat .surat {
    margin-left: 10px;
    /* border: 1px solid yellow; */
}

.list_surat .surat .nama_surat {
    /* font-size: 1.1rem; */
    /* border: 1px solid white; */
    width: 100%;
    margin-right: 100px;
}

.list_surat .ayat {
    /* border: 1px solid greenyellow; */
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    width: 100%;
}

.selected {
    border-bottom: 1px solid #ffffff;
}
</style>