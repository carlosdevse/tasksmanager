// ingresar en html:
//    <!-- change theme -->
//     <button id="btn-theme" class="btn text-gray-100 cursor-pointer border border-gray-100 rounded-md py-2 px-2 hover:bg-gray-100 hover:text-gray-900 transition delay-150 duration-300 ease-in-out hover:translate-y-1 hover:scale-110"  title="Dark Mode">
//         <i class="fa fa-solid fa-sun"></i>
//     </button>

const btnTheme = document.getElementById("btn-theme")
const currentTheme = localStorage.getItem("theme") || "light";

if (currentTheme === "dark") {
    document.body.classList.add("bg-gray-900");
} else {
    document.body.classList.add("bg-gray-100");
}

btnTheme.addEventListener("click", () => {
    const isDark = document.body.classList.contains("bg-gray-900");

    document.body.classList.toggle("bg-gray-900", !isDark);
    document.body.classList.toggle("bg-gray-100", isDark);

    localStorage.setItem("theme", isDark ? "light" : "dark");
});
