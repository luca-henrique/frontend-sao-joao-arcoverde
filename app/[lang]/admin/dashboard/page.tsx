"use client";

import Link from "next/link";
import { Camera, Users, Calendar, MapPin, Settings } from "lucide-react";
import { useDictionary } from "@/hooks/use-dictionary";
import { useParams } from "next/navigation";
import { JSX } from "react";

export default async function AdminDashboardPage() {
  const params = useParams();
  const lang = Array.isArray(params.lang) ? params.lang[0] : params.lang;

  const dict: any = useDictionary();

  const adminDict = dict.admin || {};

  const modules = [
    {
      id: "gallery",
      title: adminDict.galleryManagement || "Gerenciar Galeria",
      description:
        adminDict.galleryDescription ||
        "Adicione, edite e remova imagens da galeria do festival.",
      icon: <Camera className="w-8 h-8 text-yellow-500" />,
      href: `/${lang}/admin/dashboard/galeria`,
    },
    {
      id: "schedule",
      title: adminDict.scheduleManagement || "Gerenciar Programação",
      description:
        adminDict.scheduleDescription ||
        "Gerencie os shows e eventos do festival.",
      icon: <Calendar className="w-8 h-8 text-yellow-500" />,
      href: `/${lang}/admin/programacao`,
    },
    {
      id: "locations",
      title: adminDict.locationsManagement || "Gerenciar Locais",
      description:
        adminDict.locationsDescription ||
        "Administre os polos e locais do festival.",
      icon: <MapPin className="w-8 h-8 text-yellow-500" />,
      href: `/${lang}/admin/locais`,
    },
    {
      id: "users",
      title: adminDict.usersManagement || "Gerenciar Usuários",
      description:
        adminDict.usersDescription || "Administre os usuários do sistema.",
      icon: <Users className="w-8 h-8 text-yellow-500" />,
      href: `/${lang}/admin/usuarios`,
    },
    {
      id: "settings",
      title: adminDict.siteSettings || "Configurações do Site",
      description:
        adminDict.settingsDescription ||
        "Altere as configurações gerais do site.",
      icon: <Settings className="w-8 h-8 text-yellow-500" />,
      href: `/${lang}/admin/configuracoes`,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">
          {adminDict.dashboard || "Painel de Controle"}
        </h1>
        <p className="text-gray-400 mt-2">
          {adminDict.dashboardWelcome ||
            "Bem-vindo ao painel administrativo do São João de Arcoverde."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <CardLinkDashboard key={`${module.id}-${module.href}`} {...module}  />
        ))}
      </div>
    </div>
  );
}

interface ICardLinkDashboardProps {
  href: string;
  icon: JSX.Element;
  title: string;
  description: string;
}

export const CardLinkDashboard = ({
  href,
  icon,
  title,
  description,
}: ICardLinkDashboardProps) => {
  const translate = useDictionary();

  return (
    <Link
      key={module.id}
      href={href}
      className="bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-colors rounded-xl p-6 flex flex-col h-full"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm flex-grow">{description}</p>
      <div className="mt-4 text-yellow-500 text-sm font-medium">
        {translate.admin.manage} &rarr;
      </div>
    </Link>
  );
};
