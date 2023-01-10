 
<template>
    <table class="w-full border-collapse border p-2 text-xl ">
        <tbody>
            <tr v-for="job_alias in Jobs"
            class="bg-white even:bg-gray-300 italic">
                <td class="py-3 pl-2">{{job_alias.organization}}</td>
                <td class="max-[414px]:hidden">{{job_alias.detail.category}}</td>
                <td class="max-[414px]:hidden">{{job_alias.detail.type}}</td>
                <td class="max-[414px]:hidden">{{job_alias.detail.shift}}</td>
                <td class="max-[414px]:hidden">{{job_alias.county}}</td>
                <td><button class="text-sm hover:text-sky-700">More info</button></td>
                <td><button class="text-sm hover:text-red-700">Delete</button></td>
            </tr>
        </tbody>
    </table>    
</template>
 
<script>
    export default{
        name: 'job',
        data() {
            return{
                Jobs:[],
            }
        },
        mounted(){
            //Example jobs for testing
            this.Jobs = {
                "exampleJob1": {
                    "id": 12345,
                    "organization": "Ross",
                    "detail": {
                        "category": "Delivery",
                        "type": "Full-Time",
                        "shift": "Morning",
                        "pay": 20.0,
                        "benefits": "Paid time off",
                        "notes": "n/a",
                    },
                    "address": "123 Main st",
                    "city": "Portland",
                    "county": "Multnomah",
                },
                "exampleJob2": {
                    "id": 54321,
                    "organization": "Vet Test",
                    "detail": {
                        "category": "Clerk",
                        "type": "Part-Time",
                        "shift": "Afternoon",
                        "pay": 18.0,
                        "benefits": "Health insurance",
                        "notes": "n/a",
                    },
                    "address": "1 First st",
                    "city": "Hillsboro",
                    "county": "Washington",
                },
                "exampleJob3": {
                    "id": 1,
                    "organization": "Store Test",
                    "detail": {
                        "category": "Sales",
                        "type": "Part-Time",
                        "shift": "Evening",
                        "pay": 15.75,
                        "benefits": "",
                        "notes": "n/a",
                    },
                    "address": "1 First st",
                    "city": "Portland",
                    "county": "Multnomah",
                },
            }
        }
    }
</script>
 
<style>
</style>

