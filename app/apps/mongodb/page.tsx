'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Database, Copy, Check, Terminal, BookOpen, Zap, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function MongoDBPage() {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(text);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const commands = [
    {
      title: 'Démarrer MongoDB',
      command: 'mongod --dbpath /data/db',
      description: 'Lance le serveur MongoDB avec le chemin de données spécifié',
    },
    {
      title: 'Se connecter au shell',
      command: 'mongosh',
      description: 'Ouvre le shell interactif MongoDB',
    },
    {
      title: 'Créer une base de données',
      command: 'use myDatabase',
      description: 'Crée et sélectionne une nouvelle base de données',
    },
    {
      title: 'Insérer un document',
      command: 'db.users.insertOne({ name: "John", age: 30 })',
      description: 'Insère un document dans la collection users',
    },
    {
      title: 'Trouver des documents',
      command: 'db.users.find({ age: { $gt: 25 } })',
      description: 'Recherche les utilisateurs de plus de 25 ans',
    },
  ];

  const features = [
    'Schéma flexible JSON/BSON',
    'Scalabilité horizontale native',
    'Réplication automatique',
    'Sharding pour grandes données',
    'Agrégations puissantes',
    'Transactions ACID',
  ];

  return (
    <div className="min-h-screen liquid-glass-bg">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 backdrop-blur-2xl bg-black/20 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all font-bold group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
              <Database className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-black text-lg">MongoDB</span>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 p-12 shadow-2xl mb-8"
        >
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 bg-green-400/30 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <div className="relative flex items-start gap-8">
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-3xl blur-xl" />
              <div className="relative w-32 h-32 rounded-3xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <Database className="w-16 h-16 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-6xl font-black text-white">MongoDB</h1>
                <Sparkles className="w-8 h-8 text-emerald-300" />
              </div>
              <p className="text-2xl text-emerald-50 leading-relaxed font-medium">
                MongoDB est une base de données NoSQL orientée documents qui stocke les données dans des documents JSON flexibles. 
                Elle offre une haute performance, une haute disponibilité et une mise à l'échelle automatique.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Commands & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Commands Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                <Terminal className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-black text-white">Commandes Essentielles</h2>
            </div>

            <div className="space-y-4">
              {commands.map((cmd, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 hover:bg-white/10 hover:border-emerald-500/50 transition-all"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        {cmd.title}
                        <Sparkles className="w-4 h-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <button
                        onClick={() => copyToClipboard(cmd.command)}
                        className="px-3 py-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/40 backdrop-blur-sm transition-all border border-emerald-500/30 flex items-center gap-2 text-sm font-semibold text-emerald-300"
                      >
                        {copiedCommand === cmd.command ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Copié!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copier</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 font-mono text-sm overflow-x-auto border border-white/5 mb-3">
                      <code className="text-emerald-400">{cmd.command}</code>
                    </div>
                    <p className="text-gray-400">{cmd.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Features */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-black text-white">Fonctionnalités</h3>
              </div>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="font-semibold">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-black text-white">Ressources</h3>
              </div>
              <div className="space-y-3">
                <a
                  href="https://docs.mongodb.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 bg-blue-500/20 border border-blue-500/30 rounded-xl hover:bg-blue-500/30 transition-all"
                >
                  <p className="font-bold text-blue-300">Documentation officielle</p>
                  <p className="text-sm text-blue-400">docs.mongodb.com</p>
                </a>
                <a
                  href="https://university.mongodb.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-3 bg-purple-500/20 border border-purple-500/30 rounded-xl hover:bg-purple-500/30 transition-all"
                >
                  <p className="font-bold text-purple-300">MongoDB University</p>
                  <p className="text-sm text-purple-400">Cours gratuits</p>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
